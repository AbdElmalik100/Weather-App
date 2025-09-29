export const formattedDate = () => {
    const date = new Date()
    const formatted = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    return formatted
}