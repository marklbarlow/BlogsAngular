import { BlogComment } from 'app/model';

export const comments: BlogComment[] = [
  {
    text: 'Pellentesque tempus lobortis ligula in blandit. Fusce imperdiet imperdiet massa.',
    timestamp: new Date().toISOString(),
    userId: 1,
    userName: 'John Smith',
  },
  {
    text: 'Curabitur feugiat dui pellentesque nisi molestie, a pulvinar purus iaculis.',
    timestamp: new Date().toISOString(),
    userId: 4,
    userName: 'Homer Simpson',
  },
  {
    text: 'Quisque a rutrum leo. Nunc lacus dolor, aliquet at ex.',
    timestamp: new Date().toISOString(),
    userId: 2,
    userName: 'Darth Vader',
  },
  {
    text: 'Aliquam iaculis, ligula ut porta rutrum, lorem nisi fringilla tellus.',
    timestamp: new Date().toISOString(),
    userId: 3,
    userName: 'John Snow',
  },
];
