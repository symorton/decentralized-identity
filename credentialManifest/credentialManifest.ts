interface CredentialManifest {
  "@context": "https://identity.foundation/schemas/credentials",
    "@type": "CredentialManifest",
    "language": ["en", "en-US", "en-GB"]
    "credential": "AcmeLoanAuthorization", // Standard type or custom - how should we differentiate?
    "keeper": "did:example:12345678abcdefg", // the did who owns the hub where the credential manifest lies (not necessarily the issuer? or must be issuer for v0?)
    "version": "v1",
    "preconditions": {
        "@type": "ProofSet",
        // Groups are arbitrary, issuer-specified, string desigations that
        // can be treated as classes or IDs (if there's just one match).
        // 
        // The following 'group' expression would mean:
        // - All from A & B
        // - One from Group B
        "groups": [
          {
            "rule": "all",
            "from": ["A", "B"]
          },
          {
            "rule": "pick",
            "count": 1,
            "from": ["C"]
          }
        ],
        "inputs": [
            // JSON Schema standard descriptions to support
            // all the required value types and properties.   
            {
                "type": "data",
                "group": ["A"],
                "field": "routing_number",
                "value": { // JSON Schema
                    "type": "string",
                    "maxLength": 9
                }
            },
            {
                "type": "data",
                "group": ["A"],
                "field": "account_number",
                "value": {
                    "maxLength": 17,
                    "required": true
                }
            },
            {
                "type": "data",
                "group": ["A"],
                "field": "current_residence_duration",
                "value": {
                    "type": "number",
                    "maximum": 100
                }
            },
            {
                "type": "credential",
                "group": ["C"],
                "schema": "https://eu.com/claims/IDCard",
                "constraints": {
                    "subset": ["prop1", "prop2.foo.bar"],
                    "issuers": ["did:foo:gov1", "did:bar:gov2"]
                }
            },
            {
                "type": "credential",
                "group": ["C"],
                "schema": "hub://did:foo:123/Collections/schema.us.gov/Passport",
                "constraints": {
                    "issuers": ["did:foo:gov1", "did:bar:gov2"]
                }
                
            },
            {
                "type": "credential",
                "group": ["B"],
                "schema": ["https://claims.linkedin.com/WorkHistory", "https://about.me/WorkHistory"],
                "constraints": {
                    "issuers": ["did:foo:auditor1", "did:bar:auditor2"]
                }
                
            },
            {
                "type": "credential",
                "group": ["B"],
                "schema": "https://claims.fico.org/CreditHistory",
                "constraints": {
                    "issuers": ["did:foo:bank1", "did:bar:bank2"]
                }
            },
            {
                "type": "openid",
                "group": ["A"],
                "redirect": "https://login.microsoftonline.com/oauth/"
                "parameters": {
                    "client_id": "dhfiuhsdre",
                    "scope": "openid+profile",
                    
                }
            }
        ]
    },
    "issuer_options": {
        "input": {
            "styles": {
                "logo": {
                    "url": "https://acme.com/logo.png", // Link or Base 64 image. Can be a hashlink if integrity proof is required
                },
                "background": {
                    "color": [247, 247, 247]
                },
                "formLabel": {
                    "color": [180, 55, 20] // Assume colors are RGB or HSL values?
                },
                "formInputBorder": {
                    "color": [200, 180, 10]
                }
            },
            "labels": { // input labels that correspond to data inputs
                "routing_number": "Your Bank Routing Number",
                "account_number": "Your Bank Account Number",
                "current_residence_duration": "How long have you been at your address?"
            }
        },
        "presentation": { // what should appear on the credential card and style
            "issuer_name": "Acme Loan Authorization",
            "credential_name": "Home Loan",
            "description": "This is a home loan",
            "claims": // claims that can appear on card
                {
                    /**
                     * metadata pertaining to each claim in the claim token and how that claim should be presented.
                     */
                    "loan_amount": {
                        "label": "Loan Amount",
                        "type": "string",
                        "value": "loan_amount"
                    },
                    "term": {
                        "label": "Term Length",
                        "type": "number",
                        "value": "${term_length} years"
                    },
                    "iss": {
                        "label": "Issued on",
                        "type": "date",
                        "value": "iss_date"
                    }
                },
            "styles": {
                "logo": {
                   "url": "https://acme.com/logo.png", // Link or Base 64 image. Can be a hashlink if integrity proof is required
                },
                "background": {
                   "color": [247, 247, 247]
                },
                "font": {
                    "color": [0, 0, 0]
                }
            }
        }
    }
}