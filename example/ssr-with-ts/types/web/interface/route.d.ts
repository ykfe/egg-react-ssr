/// <reference types="react" />
export interface RouteItem {
    path: string;
    exact?: boolean;
    Component(): Component;
}
export interface Component {
    Layout?: new () => React.Component<any, any>;
}
