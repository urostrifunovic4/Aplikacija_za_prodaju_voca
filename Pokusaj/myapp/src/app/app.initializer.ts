import { Observable } from "rxjs";
import { KupacService } from "./kupac.service";
import { Kupac } from "./models/kupac";
export function initializeAppFactory(
  userService: KupacService
): () => Observable<Kupac[]> {
  return () => userService.getAllKupac();
}