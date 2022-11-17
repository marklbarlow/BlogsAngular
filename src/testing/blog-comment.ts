import { BlogComment } from 'app/model';

export const comments: BlogComment[] = [
  {
    text: 'Pellentesque tempus lobortis ligula in blandit. Fusce imperdiet imperdiet massa.',
    timestamp: new Date().toISOString(),
    userId: 1,
    username: 'John Smith',
  },
  {
    text: 'Curabitur feugiat dui pellentesque nisi molestie, a pulvinar purus iaculis.',
    timestamp: new Date().toISOString(),
    userId: 4,
    username: 'Homer Simpson',
  },
  {
    text: 'Quisque a rutrum leo. Nunc lacus dolor, aliquet at ex.',
    timestamp: new Date().toISOString(),
    userId: 2,
    username: 'Darth Vader',
  },
  {
    text: 'Aliquam iaculis, ligula ut porta rutrum, lorem nisi fringilla tellus.',
    timestamp: new Date().toISOString(),
    userId: 3,
    username: 'John Snow',
  },
];
