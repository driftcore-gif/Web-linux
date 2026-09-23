VM assets
=========
The VM application expects SeaBIOS and VGA BIOS assets from the v86 distribution at build/runtime.

If your installed v86 package exposes these files, copy or link them into this directory as:
  seabios.bin
  vgabios.bin

You also need a legal guest ISO/disk image selected through the VM app.

The project intentionally does not bundle third-party operating-system images.