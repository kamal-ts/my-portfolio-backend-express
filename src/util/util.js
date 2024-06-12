export const formatData = (data) => {
    if (!data.startsWith(',')) {
        data = `,${data}`;
    }
    if (!data.endsWith(',')) {
        data = `${data},`;
    }

    return data;
}