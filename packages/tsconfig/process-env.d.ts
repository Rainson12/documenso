declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_WEBAPP_URL?: string;
    NEXT_PUBLIC_MARKETING_URL?: string;

    NEXT_PRIVATE_GOOGLE_CLIENT_ID?: string;
    NEXT_PRIVATE_GOOGLE_CLIENT_SECRET?: string;

    NEXT_PRIVATE_OIDC_WELL_KNOWN?: string;
    NEXT_PRIVATE_OIDC_CLIENT_ID?: string;
    NEXT_PRIVATE_OIDC_CLIENT_SECRET?: string;
    NEXT_PRIVATE_OIDC_ALLOW_SIGNUP?: string;
    NEXT_PRIVATE_OIDC_TRUST_EMAILADDRESSES?: string;
    NEXT_PRIVATE_OIDC_PROVIDER_LABEL?: string;

    NEXT_PRIVATE_DATABASE_URL: string;
    NEXT_PRIVATE_ENCRYPTION_KEY: string;
    NEXT_PRIVATE_ENCRYPTION_SECONDARY_KEY: string;

    NEXT_PUBLIC_STRIPE_COMMUNITY_PLAN_MONTHLY_PRICE_ID: string;

    NEXT_PRIVATE_STRIPE_API_KEY: string;
    NEXT_PRIVATE_STRIPE_WEBHOOK_SECRET: string;

    NEXT_PUBLIC_UPLOAD_TRANSPORT?: 'database' | 's3';
    NEXT_PRIVATE_UPLOAD_ENDPOINT?: string;
    NEXT_PRIVATE_UPLOAD_FORCE_PATH_STYLE?: string;
    NEXT_PRIVATE_UPLOAD_REGION?: string;
    NEXT_PRIVATE_UPLOAD_BUCKET?: string;
    NEXT_PRIVATE_UPLOAD_ACCESS_KEY_ID?: string;
    NEXT_PRIVATE_UPLOAD_SECRET_ACCESS_KEY?: string;
    NEXT_PRIVATE_UPLOAD_DISTRIBUTION_DOMAIN?: string;
    NEXT_PRIVATE_UPLOAD_DISTRIBUTION_KEY_ID?: string;
    NEXT_PRIVATE_UPLOAD_DISTRIBUTION_KEY_CONTENTS?: string;

    NEXT_PRIVATE_SIGNING_TRANSPORT?: 'local' | 'http' | 'gcloud-hsm';
    NEXT_PRIVATE_SIGNING_PASSPHRASE?: string;
    NEXT_PRIVATE_SIGNING_LOCAL_FILE_PATH?: string;
    NEXT_PRIVATE_SIGNING_LOCAL_FILE_CONTENTS?: string;
    NEXT_PRIVATE_SIGNING_LOCAL_FILE_ENCODING?: string;
    NEXT_PRIVATE_SIGNING_GCLOUD_HSM_KEY_PATH?: string;
    NEXT_PRIVATE_SIGNING_GCLOUD_HSM_PUBLIC_CRT_FILE_PATH?: string;
    NEXT_PRIVATE_SIGNING_GCLOUD_HSM_PUBLIC_CRT_FILE_CONTENTS?: string;
    NEXT_PRIVATE_SIGNING_GCLOUD_APPLICATION_CREDENTIALS_CONTENTS?: string;

    NEXT_PRIVATE_SMTP_TRANSPORT?: 'mailchannels' | 'resend' | 'smtp-auth' | 'smtp-api';

    NEXT_PRIVATE_RESEND_API_KEY?: string;

    NEXT_PRIVATE_MAILCHANNELS_API_KEY?: string;
    NEXT_PRIVATE_MAILCHANNELS_DKIM_DOMAIN?: string;
    NEXT_PRIVATE_MAILCHANNELS_DKIM_SELECTOR?: string;
    NEXT_PRIVATE_MAILCHANNELS_DKIM_PRIVATE_KEY?: string;
    NEXT_PRIVATE_MAILCHANNELS_ENDPOINT?: string;

    NEXT_PRIVATE_SMTP_HOST?: string;
    NEXT_PRIVATE_SMTP_PORT?: string;
    NEXT_PRIVATE_SMTP_USERNAME?: string;
    NEXT_PRIVATE_SMTP_PASSWORD?: string;

    NEXT_PRIVATE_SMTP_APIKEY_USER?: string;
    NEXT_PRIVATE_SMTP_APIKEY?: string;

    NEXT_PRIVATE_SMTP_SECURE?: string;
    NEXT_PRIVATE_SMTP_UNSAFE_IGNORE_TLS?: string;

    NEXT_PRIVATE_SMTP_FROM_NAME?: string;
    NEXT_PRIVATE_SMTP_FROM_ADDRESS?: string;

    NEXT_PUBLIC_DISABLE_SIGNUP?: string;

    //
    NEXT_PRIVATE_BROWSERLESS_URL?: string;

    NEXT_PRIVATE_JOBS_PROVIDER?: 'trigger' | 'inngest' | 'local';

    /**
     * Trigger.dev environment variables
     */
    NEXT_PRIVATE_TRIGGER_API_KEY?: string;
    NEXT_PRIVATE_TRIGGER_API_URL?: string;

    /**
     * Inngest environment variables
     */
    NEXT_PRIVATE_INNGEST_EVENT_KEY?: string;

    /**
     * Vercel environment variables
     */
    VERCEL?: string;
    VERCEL_ENV?: 'production' | 'development' | 'preview';
    VERCEL_URL?: string;

    DEPLOYMENT_TARGET?: 'webapp' | 'marketing';
    FONT_CAVEAT_URI: string;
    FONT_NOTO_SANS_URI: string;

    POSTGRES_URL?: string;
    DATABASE_URL?: string;
    POSTGRES_PRISMA_URL?: string;
    POSTGRES_URL_NON_POOLING?: string;
  }
}
