import { provideRouter } from '@angular/router';
import { managerRoutes } from './manager.routes';

export const provideManagerRouter = () => provideRouter(managerRoutes);
