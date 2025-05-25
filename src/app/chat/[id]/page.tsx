import { characters } from '@/data/characters';
import ChatComponent from '@/components/ChatComponent';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ChatPage({ params }: Props) {
  const { id } = await params;
  const characterId = parseInt(id);
  const character = characters.find(c => c.id === characterId);

  if (!character) {
    return <div>Character not found</div>;
  }

  return <ChatComponent character={character} />;
} 