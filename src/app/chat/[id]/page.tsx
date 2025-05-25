import { characters } from '@/data/characters';
import ChatComponent from '@/components/ChatComponent';

interface Props {
  params: {
    id: string;
  };
}

export default function ChatPage({ params }: Props) {
  const characterId = parseInt(params.id);
  const character = characters.find(c => c.id === characterId);

  if (!character) {
    return <div>Character not found</div>;
  }

  return <ChatComponent character={character} />;
} 