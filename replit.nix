{ pkgs }: { deps = with pkgs; [
  less
  vim
  bashInteractive # Todo: Is this for auto-completion?
  nodejs-18_x
    nodePackages.typescript
    nodePackages.typescript-language-server
    nodePackages.pnpm # Best of YARN 2, but as easy to run as NPM
]; }