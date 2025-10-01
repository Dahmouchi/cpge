const roleOf = async (role: string) => {

  if (!role) {
    return null;
  }

  if (role === "ADMIN") {
    return "admin";
  }

  if (role === "ETUDIANT") {
    return "user";
  }

  if (role === "ENSEIGNANT") {
    return "guest";
  }
  if (role === "PARENT") {
    return "parent";
  }
};

export default roleOf;
