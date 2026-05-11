# Security Specification

## Data Invariants
1. A User must have a defined role.
2. A Shop belongs to an ownerId.
3. A Product belongs to a Shop.
4. An Order contains a shopId and customerId.

## The "Dirty Dozen" Payloads
1. **Creation Shadow Field:** Adding `isAdmin: true` to a standard shop creation payload.
2. **Missing required schema keys:** Sending an empty maps for Product creation.
3. **Invalid ID string:** Sending a 2MB string for Document ID path.
4. **Spoofed User ID in creation:** Creating an order with a mismatched customer Id.
5. **Editing Immutable Fields:** Trying to change the `createdAt` timestamp of a Shop.
6. **State Skip:** Changing a Shop status directly from `pending` to `active` as a standard user.
7. **Type Mismatch:** Sending a number type for `name` field in Product payload.
8. **Size Exploitation:** Sending an array of 100,000 Order Items. (Tested by boundary checks).
9. **Role Escalation:** Setting role to `admin` in `users` collection without admin rights.
10. **Spoofed Auth:** Attempt with verified email to manipulate system without proper `uid`.
11. **Client Delegation ByPass:** Running a "list" query without where clauses.
12. **PII Access:** Reading `/users/{userId}/private/info` of another user.

## The Test Runner
A complete `firestore.rules.test.ts` file verifies all rules.
