-- Tabela para sobrescrever o nome e o tipo de cabeçalho das modalidades fixas (sportsConfig)
-- Cada linha representa um override de um evento estático de um esporte específico.

CREATE TABLE IF NOT EXISTS public.static_event_overrides (
  id          bigserial PRIMARY KEY,
  sport_id    text        NOT NULL,
  event_id    text        NOT NULL,
  name        text        NOT NULL,
  table_type  text        NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_static_event_override UNIQUE (sport_id, event_id)
);

-- Habilita Row Level Security
ALTER TABLE public.static_event_overrides ENABLE ROW LEVEL SECURITY;

-- Permite leitura pública (placar público)
CREATE POLICY "Allow public read" ON public.static_event_overrides
  FOR SELECT USING (true);

-- Permite inserção/atualização/deleção autenticadas (painel admin)
CREATE POLICY "Allow authenticated write" ON public.static_event_overrides
  FOR ALL USING (true) WITH CHECK (true);

-- Habilita Realtime para sincronização em tempo real
ALTER PUBLICATION supabase_realtime ADD TABLE public.static_event_overrides;
