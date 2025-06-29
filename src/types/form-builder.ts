export interface Page {
    id: string;
    title: string;
    icon: React.ReactNode;
  }
  
  export interface FormPage extends Page {
    component: React.ComponentType<unknown>;
  }