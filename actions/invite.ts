// actions/sendInvite.ts

export const sendInvite = async (email: string,name:any) => {
  try {
    const response = await fetch("/api/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email,name }),
    });

    if (!response.ok) {
      throw new Error("Failed to send invite.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending invite:", error);
    throw error;
  }
};
