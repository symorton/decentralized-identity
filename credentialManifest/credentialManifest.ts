interface CredentialManifest {
  "@context": "https://identity.foundation/schemas/credentials",
    "@type": "CredentialManifest",
    "language": ["en", "en-US", "en-GB"]
    "credentialManifest": {
        "credential": "AcmeLoanAuthorization", // Standard type or custom - how should we differentiate?
        "keeper": "did:example:12345678abcdefg", // the did who owns the hub where the credential manifest lies (not necessarily the issuer? or must be issuer for v0?)
        "version": "v1",
    },
    "preconditions": { // what are preconditions and why is inputs in the preconditions
        "@type": "ProofSet", // why do we have this?
        "inputs": [ 
            {
                "type": "data",
                "field": "routing_number",
                "label": "Routing Number"
                "desc": "Please enter your routing number"
            },
            {
                "type": "data",
                "field": "account_number",
                "label": "Account Number"
                "descr": "Please enter your account number"
            },
            {
                "type": "data",
                "field": "current_residence_duration",
                "label": "Current Resident Duration"
                "descr": "How long have you been at your address?"
            },
            {
                "type": "credential",
                "schema": "https://eu.com/claims/IDCard",
                "label": "Identification Credential"
                "descr": "We need access to your Identification Credential."
            },
            {
                "type": "credential",
                "schema": ["https://claims.linkedin.com/WorkHistory", "https://about.me/WorkHistory"],  
                "label": "Work History"
                "descr": "We need access to your Work History."          
            },
            {
                "type": "openid",
                "redirect": "https://login.microsoftonline.com/oauth/"
                "parameters": {
                    "client_id": "dhfiuhsdre",
                    "scope": "openid+profile",   
                }
                "label": "Microsoft Authentication"
                "descr": "Please sign into your Microsoft Account."
            }
        ]
    },
    "issuer_options": {
        "helpLinks": { 
            "link": "https://www.ucla-example-website.com/help" 
        };
        "styles": {
            "logo": {
                "url": "https://acme.com/logo.png", // Link or Base 64 image. Can be a hashlink if integrity proof is required
                "description": "Acme Home Loans Logo",
            },
            "hexBackground": "#FFFFFF",
            "hexFormLabelColor": "#ABABAD"
            "hexFormInputBorder": "#536878"
        }
    }
}

/**
 * what should appear on the credential card in the UA
 */
interface CredentialPresentation {
    "credentialManifest": {
        "credential": "AcmeLoanAuthorization", // Standard type or custom - how should we differentiate?
        "keeper": "did:example:12345678abcdefg", // the did who owns the hub where the credential manifest lies (not necessarily the issuer? or must be issuer for v0?)
        "version": "v1",
    },
    "issuer_name": "Acme Loan Authorization",
    "credential_name": "Home Loan",
    "description": {
        "header": "Acme Loan",
        "body": "This is a home loan",
    },
    "uses": [
      // where we can use this credential
      {
        "header": "House Shopping",
        "body": "Use this loan to buy a house from the following Real Estate Agencies.",
      }
    ],
    "linksData": { 
        "uris": [ 
            { 
                "@type": "hub://did:example:ghi789/uri", 
                "uri": "tel:7705555555", 
                "description": "Call Customer Service" 
            } 
        ] 
    },
    "credentials": // credential that can appear on card
        {
            /**
             * metadata pertaining to each credential in the credential token and
             * how that credential should be presented.
             */
            "loan_amount": {
                "label": "Loan Amount",
                "type": "string",
                "value": "loan_amount"
            },
            "term": {
                "label": "Term Length",
                "type": "number",
                "value": "term_length"
            },
            "iss": {
                "label": "Issued on",
                "type": "date",
                "value": "iss_date"
            }
        },
    "verifiedData": "eyb....", // the actual signed (or unsigned) data
    "styles": {
        "logo": {
            "url": "https://acme.com/logo.png", // Link or Base 64 image. Can be a hashlink if integrity proof is required
            "description": "Acme Home Loans Logo",
        },
        "hexBackground": "#FFFFFF",
        "imgBackground": {
            "url": "https://acme.com/logo.png", // Link or Base 64 image. Can be a hashlink if integrity proof is required
            "description": "Acme Home Loans Logo"
        },
        "hexFont": "#000000",
    }
}