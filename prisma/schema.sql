-- Schema SQL completo per il database LibDev

-- Tabella dei progetti
CREATE TABLE IF NOT EXISTS "Project" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabella dei file
CREATE TABLE IF NOT EXISTS "File" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(255) NOT NULL,
  "path" VARCHAR(512) NOT NULL,
  "content" TEXT NOT NULL,
  "language" VARCHAR(50) NOT NULL,
  "lastModified" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "projectId" UUID NOT NULL,
  CONSTRAINT "fk_file_project" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE
);

-- Indice per migliorare le query sui file per progetto
CREATE INDEX IF NOT EXISTS "idx_file_project" ON "File"("projectId");

-- Tabella delle impostazioni
CREATE TABLE IF NOT EXISTS "Setting" (
  "id" VARCHAR(255) PRIMARY KEY,
  "value" JSONB NOT NULL
);

-- Tabella degli utenti
CREATE TABLE IF NOT EXISTS "User" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "name" VARCHAR(255),
  "password" VARCHAR(255),
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabella delle librerie
CREATE TABLE IF NOT EXISTS "Library" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(255) NOT NULL,
  "version" VARCHAR(50) NOT NULL,
  "description" TEXT,
  "language" VARCHAR(50) NOT NULL,
  "url" VARCHAR(512),
  "stars" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabella degli snippet
CREATE TABLE IF NOT EXISTS "Snippet" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "code" TEXT NOT NULL,
  "language" VARCHAR(50) NOT NULL,
  "tags" VARCHAR(255)[],
  "userId" UUID,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "fk_snippet_user" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL
);

-- Tabella delle estensioni
CREATE TABLE IF NOT EXISTS "Extension" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(255) NOT NULL,
  "publisher" VARCHAR(255) NOT NULL,
  "version" VARCHAR(50) NOT NULL,
  "description" TEXT,
  "icon" VARCHAR(512),
  "downloadCount" INTEGER DEFAULT 0,
  "rating" DECIMAL(3,2),
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabella per le relazioni tra progetti e utenti
CREATE TABLE IF NOT EXISTS "ProjectUser" (
  "projectId" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "role" VARCHAR(50) NOT NULL DEFAULT 'editor',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("projectId", "userId"),
  CONSTRAINT "fk_projectuser_project" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE,
  CONSTRAINT "fk_projectuser_user" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Funzione per aggiornare automaticamente il timestamp updatedAt
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger per aggiornare automaticamente updatedAt nelle tabelle
CREATE TRIGGER update_project_updated_at
BEFORE UPDATE ON "Project"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_file_updated_at
BEFORE UPDATE ON "File"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_user_updated_at
BEFORE UPDATE ON "User"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_library_updated_at
BEFORE UPDATE ON "Library"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_snippet_updated_at
BEFORE UPDATE ON "Snippet"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_extension_updated_at
BEFORE UPDATE ON "Extension"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
