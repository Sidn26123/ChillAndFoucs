//copy to string to clipboard

export const copyToClipboard = (str) => {
    navigator.clipboard
        .writeText(str)
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.error("Failed to copy: ", err);
            return false;
        });
};
