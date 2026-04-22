-- V2__audit_log.sql
-- Audit log table to track every change made to consent records
-- Author: Jayanth C (Java Developer 2)

CREATE TABLE audit_log (
    id BIGSERIAL PRIMARY KEY,

    -- which consent record was changed
    consent_record_id BIGINT NOT NULL,

    -- what action was performed
    action VARCHAR(20) NOT NULL,
    -- values: CREATE, UPDATE, DELETE, STATUS_CHANGE

    -- who did it
    performed_by VARCHAR(100) NOT NULL,
    performed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- what changed (store old and new values as text)
    old_value TEXT,
    new_value TEXT,

    -- extra notes if needed
    remarks VARCHAR(500),

    CONSTRAINT fk_consent_record
        FOREIGN KEY (consent_record_id)
        REFERENCES consent_record(id),

    CONSTRAINT chk_action
        CHECK (action IN ('CREATE', 'UPDATE', 'DELETE', 'STATUS_CHANGE'))
);

-- we'll query audit logs mostly by consent record
CREATE INDEX idx_audit_consent_id ON audit_log(consent_record_id);
CREATE INDEX idx_audit_performed_at ON audit_log(performed_at);
CREATE INDEX idx_audit_action ON audit_log(action);