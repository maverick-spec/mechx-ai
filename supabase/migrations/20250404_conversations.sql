
-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  last_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create conversation_messages table
CREATE TABLE IF NOT EXISTS conversation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create a function to save search queries
CREATE OR REPLACE FUNCTION save_search_query(query_text TEXT)
RETURNS VOID AS $$
BEGIN
  -- You could implement additional logic here if needed
  RETURN;
END;
$$ LANGUAGE plpgsql;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_conversation_messages_conversation_id 
ON conversation_messages(conversation_id);

CREATE INDEX IF NOT EXISTS idx_conversations_created_at 
ON conversations(created_at);

-- Enable row-level security (RLS)
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for conversations
CREATE POLICY "Public access to conversations" ON conversations
  FOR ALL USING (true);

-- Create policies for conversation_messages
CREATE POLICY "Public access to conversation_messages" ON conversation_messages
  FOR ALL USING (true);
