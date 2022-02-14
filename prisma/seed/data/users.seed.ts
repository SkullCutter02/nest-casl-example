import { User, Role } from "@prisma/client";

const users: User[] = [
  {
    id: "f1bdf45e-1b1c-11ec-9621-0242ac130002",
    createdAt: new Date("Tue Sep 21 2021 16:16:50 GMT-0400 (Eastern Daylight Time)"),
    updatedAt: new Date("Tue Sep 21 2021 16:16:50 GMT-0400 (Eastern Daylight Time)"),
    name: "SkullCutter",
    email: "coolalan2016@gmail.com",
    infoId: "64cc8c36-8171-49b1-88da-44ad09133da6",
    roles: [Role.admin, Role.user],
  },
  {
    id: "9d89eedb-687d-4f5b-a6f2-dd4f723edf8e",
    createdAt: new Date("Tue Sep 21 2021 16:16:50 GMT-0400 (Eastern Daylight Time)"),
    updatedAt: new Date("Tue Sep 21 2021 16:16:50 GMT-0400 (Eastern Daylight Time)"),
    name: "Alan Au",
    email: "chunyaa2023@student.cis.edu.hk",
    infoId: "6aa3ab84-3b0f-479b-bf00-9a9f490ae586",
    roles: [Role.user],
  },
];

export default users;
