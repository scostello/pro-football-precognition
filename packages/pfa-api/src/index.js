// @flow
import createApi from './api';

createApi()
  .subscribe({
    next: api => api
      .listen({ host: '0.0.0.0', port: 4000 }, () => console.log('🚀 Server ready at http://localhost:4000!')),
  });
