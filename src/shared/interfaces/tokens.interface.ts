export interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
}
export interface TokenPayload {
  sub: string;
}
