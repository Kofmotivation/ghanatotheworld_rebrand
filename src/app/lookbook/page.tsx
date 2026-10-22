import { redirect } from "next/navigation";

/** Lookbook folded into Campaign House Looks + campaign stills */
export default function LookbookRedirect() {
  redirect("/looks");
}
