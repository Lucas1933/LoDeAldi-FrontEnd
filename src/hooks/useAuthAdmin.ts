const validateAdmin = async (email: string, password: string) => {
  const response = await fetch(import.meta.env.VITE_LO_DE_ALDI_API + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Modify this header if needed
    },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export default validateAdmin;
