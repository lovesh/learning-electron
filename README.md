# ed25519 keygen using Electron

This is a my first Electron application based on some electron sample code i copied from few github repos, it is a keygen and used to generate ed25519 keypair. Also there is an `Apps` menu to load a window that can be used to create hashes.
I used linux for development. It can create linux and windows apps using `npm run package-linux` and `npm run package-win` respectively, you need wine installed for creating windows app though

# Next steps
1. take seed from user input
2. use libindy to create keypair
3. save keypair with alias in sqlite
4. use sqlcipher
