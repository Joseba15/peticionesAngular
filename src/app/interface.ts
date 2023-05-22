export interface Usuario {
    ok:       boolean;
    usuarios: UsuarioElement[];
    total:    number;
}

export interface UsuarioElement {
    role:   string;
    email:  string;
    nombre: string;
    uid:    string;
}
