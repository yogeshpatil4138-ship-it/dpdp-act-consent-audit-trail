-- V1__init.sql
-- Core table for storing consent records under DPDP Act
-- Author: Jayanth C (Java Developer 2)

CREATE TABLE consent_record (
    id BIGSERIAL PRIMARY KEY,

    -- citizen who is giving consent
    data_principal_id VARCHAR(100) NOT NULL,
    data_principal_name VARCHAR(255) NOT NULL,
    data_principal_email VARCHAR(255) NOT NULL,

    -- organization collecting the data
    data_fiduciary_id VARCHAR(100) NOT NULL,
    data_fiduciary_name VARCHAR(255) NOT NULL,

    -- what data is being collected and for what reason
    purpose VARCHAR(500) NOT NULL,
    data_categories VARCHAR(500) NOT NULL,

    -- PENDING by default, updated when citizen responds
    consent_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',

    -- filled by AI service after record is created
    ai_description TEXT,
    ai_score INTEGER,
    is_fallback BOOLEAN DEFAULT FALSE,

    consent_date TIMESTAMP,
    expiry_date TIMESTAMP,

    -- soft delete instead of actual delete
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- only allow these 4 status values
ALTER TABLE consent_record ADD CONSTRAINT chk_consent_status
CHECK (consent_status IN ('PENDING', 'GRANTED', 'REVOKED', 'EXPIRED'));

-- score must be between 1 and 100 if provided
ALTER TABLE consent_record ADD CONSTRAINT chk_ai_score
CHECK (ai_score IS NULL OR (ai_score BETWEEN 1 AND 100));

-- indexes on columns we'll search and filter by most
CREATE INDEX idx_principal ON consent_record(data_principal_id);
CREATE INDEX idx_fiduciary ON consent_record(data_fiduciary_id);
CREATE INDEX idx_status ON consent_record(consent_status);
CREATE INDEX idx_created ON consent_record(created_at);
CREATE INDEX idx_active ON consent_record(is_active);