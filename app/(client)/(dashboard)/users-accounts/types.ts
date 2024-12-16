export interface UserModules {
    id: number,
    name: string,
    permissions: Permissions
}

interface Permissions {
    create: boolean,
    read: boolean,
    modify: boolean,
    delete: boolean,
}