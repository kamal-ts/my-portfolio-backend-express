export const formatData = (data) => {
    if (!data.startsWith(',')) {
        data = `,${data}`;
    }
    if (!data.endsWith(',')) {
        data = `${data},`;
    }

    return data;
};


    // const myprojectTest = await prismaClient.myProject.findMany({
    //     where: {
    //         AND: [
    //             {
    //                 category: {

    //                 }
    //             }
    //         ]
    //     },
    //     take: request.size,
    //     skip: skip
    // });
