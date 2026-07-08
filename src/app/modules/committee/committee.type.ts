
import z from "zod";
import { createCommitteeValidate, updateCommitteeValidate, } from "./committee.validate.js";

export type ICreateCommittee = z.infer<typeof createCommitteeValidate>
export type IUpdateCommittee = z.infer<typeof updateCommitteeValidate>