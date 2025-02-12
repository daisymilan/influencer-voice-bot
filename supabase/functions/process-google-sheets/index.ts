
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { google } from 'https://deno.land/x/google_auth@v0.8.0/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GoogleSheetsRow {
  product_name: string;
  affiliate_link: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { influencer_id, sheets_url } = await req.json()
    
    if (!influencer_id || !sheets_url) {
      throw new Error('Missing required parameters')
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables')
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Extract spreadsheet ID from the URL
    const spreadsheetId = sheets_url.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1]
    if (!spreadsheetId) {
      throw new Error('Invalid Google Sheets URL')
    }

    // Set up Google OAuth client
    const clientId = Deno.env.get('GOOGLE_CLIENT_ID')
    const clientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET')

    if (!clientId || !clientSecret) {
      throw new Error('Missing Google OAuth credentials')
    }

    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      'https://developers.google.com/oauthplayground' // Temporary redirect URI for testing
    );

    // For now, we'll use service account authentication since it's simpler for backend usage
    // You would need to set up proper OAuth flow for user authentication in a production environment
    oauth2Client.setCredentials({
      access_token: 'placeholder', // This will be replaced by proper OAuth flow
      refresh_token: 'placeholder' // This will be replaced by proper OAuth flow
    });

    // Initialize Google Sheets API
    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

    // Fetch data from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A2:B', // Assuming headers are in row 1
    });

    const rows = response.data.values || [];

    // Delete existing affiliate links for this influencer
    await supabase
      .from('affiliate_links')
      .delete()
      .eq('influencer_id', influencer_id)

    // Process and insert new affiliate links
    const affiliateLinks = rows.map((row: string[]) => ({
      influencer_id,
      product_name: row[0],
      affiliate_link: row[1]
    }))

    const { error } = await supabase
      .from('affiliate_links')
      .insert(affiliateLinks)

    if (error) {
      throw error
    }

    console.log(`Successfully processed ${affiliateLinks.length} affiliate links for influencer ${influencer_id}`)

    return new Response(
      JSON.stringify({ success: true, count: affiliateLinks.length }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error processing Google Sheets:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
