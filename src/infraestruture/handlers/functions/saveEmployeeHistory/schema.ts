export default {
  type: "object",
  properties: {
    previousSalary: {
      type: "number",
    },
    newSalary: {
      type: "number",
    },
  },
  required: ["previousSalary", "newSalary"],
};
