[@] users
    [-] Dùng để lưu danh sách users
[@] userCharts
    [-] Dùng để lưu danh sách người liên hệ của tài khoản
    [-] Mỗi document là một user
    [-] Mỗi field là một người liên hệ với user đó
[@] chats
    [-] Dùng để để lưu các tin nhắn
    [-] Mỗi document được coi như là một roomchat có id là giữa chủ tài khoản với người liên hệ
    [-] Mỗi field sẽ lưu tất cả tin nhắn của roomchat đó

images.map((image) => {
                const storageRef = ref(storage, uuid());
                const uploadTask = uploadBytesResumable(storageRef, image.file);

                // uploadTask.on('state_changed', (snapshot) => {}, (error) => {}, () => {
                //     // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                //     //     return downloadURL;
                //     // });
                //     // url = await getDownloadURL(uploadTask.snapshot.ref);
                //     // return url;
                // });
                uploadTask.then(async (snapshot) => {
                    imagesURL.push(await getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                        return downloadURL;
                    }));
                });
            });