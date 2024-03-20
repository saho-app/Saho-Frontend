import type { Cookies } from "@sveltejs/kit";
import { jwtDecode } from "jwt-decode";
import { derived, writable, type Readable, type Writable } from "svelte/store";

// place files you want to import through the `$lib` alias in this folder.
export const BackendURL = "http://localhost:5003";

export class JwtPayload {
	public unique_name: string = "";
	public role: string = "";
	public iss: string = "";
	public aud: string = "";
	public iat: number = 0;
	public exp: number = 0;
	public nbf: number = 0;
	public SecurityCode: number = 0;
	public id: number = 0;
}

export class Playlist {
	public Id: number = 0;
	public Title: string = "";
	public OwnerNickname: string = "";
	public IsPrivate: boolean = false;
}

export class Auth {
	public Token: string | undefined;
	public Id: number = 0;
	public Expires: number = 0;
	public Roles: string[] = [];

	public static FromCookie(cookies: Cookies): Auth {
		const token = cookies.get('token');
		const auth = new Auth;
		if (token) {
			const decoded = jwtDecode<JwtPayload>(token);
			auth.Token = token;
			auth.Id = decoded.id;
			auth.Expires = decoded.exp ?? 0;
			auth.Roles = decoded.role.split(',');
		}
		return auth;
	}

	public IsValid(): boolean {
		return Boolean(this.Token) && this.Expires * 1000 > Date.now();
	}
}

export class User {
	public Id: number = 0;
	public Nickname: string = "";
	public IsArtist: boolean = false;
	public IsAdmin: boolean = false;

	public static async FromAuth(auth: Auth): Promise<User> {
		const res = await fetch(`${BackendURL}/users/${auth.Id}`, { headers: { "Authorization": `Bearer ${auth.Token}` } });
		let nickname: string = "";
		if (res.ok) {
			nickname = (await res.json()).nickname;
		}
		if (nickname.startsWith('!')) {
			nickname = nickname.slice(1);
		}
		return { Id: auth.Id, IsAdmin: auth.Roles.includes('Admin') || auth.Roles.includes('Superadmin'), IsArtist: auth.Roles.includes('Artist'), Nickname: nickname }
	}
}

export class Song {
	public id: number = 0;
	public title: string = "";
	public artistNickname: string = "";
	public timesPlayed: number = 0;
	public isPrivate: boolean = true;
	public isLiked: boolean = false;
};