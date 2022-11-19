import { BlogPreview } from 'app/model';

export const previews: BlogPreview[] = [
  {
    id: 1,
    timestamp: new Date().toISOString(),
    title: 'Proin ac congue lorem, rhoncus',
    userId: 1,
    username: 'John Smith',
  },
  {
    id: 2,
    timestamp: new Date().toISOString(),
    title: 'Donec euismod est vitae nisi',
    userId: 1,
    username: 'John Smith',
  },
  {
    id: 3,
    timestamp: new Date().toISOString(),
    title: 'Maecenas quam urna, auctor eu',
    userId: 1,
    username: 'John Smith',
  },
];
