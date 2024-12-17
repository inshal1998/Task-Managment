export interface APiConfig {
    base_url: string;
  }
  const DEFAULT_API_CONFIG: APiConfig = {
    base_url: 'https://task-managment-dok8.vercel.app/tasks',
  };
  export {DEFAULT_API_CONFIG};