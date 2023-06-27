<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">ETHStacks.xyz</h3>

  <p align="center">
    Stack your bags with token bound accounts
  </p>
</div>

<!-- ETH Waterloo Submission -->

## Short Description
ETHStacks.xyz is an account management interface for token bound accounts (TBAs). Stack your assets in token bound accounts and manage them all through a simple interface. 

## About the project

ETHStacks.xyz is an account management interface for token bound accounts (TBAs). By leveraging the properties of ERC-6551 tokens, ETHStacks allows you to create token bound accounts and manage them all through a simple interface. 

### Why ETHStacks.xyz?
* Manage multiple token bound accounts through a simple interface
* Stack assets within token bound accounts 
* Interact with dApps and dynamic NFTs as your token bound accounts
* Take advantage of the security, privacy and capabilities of smart contract wallets

Our goal was to explore use cases leveraging the parent-child relationship of ERC-6551 tokens, improve the existing wallet management user experience and build a future-facing solution for managing assets and inventory of token bound accounts. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## How it works

[ETHStacks.xyz](http://ETHStacks.xyz) used an NFT Contract factory to deploy and NFT contract for each user. Each NFT token minted represents a `Stack`, a ERC-6551 token-bound account that can hold ERC20 and ERC721 tokens, and execute functions on other contracts.

When s Stacks NFT contract is deployed, it also mints the master NFT stack, and deploys an ERC-6551 Account for the master or "root" Stack. All subsequent NFTs minted are "children" NFTs that are owned by this master tokenbound account. Each NFT has it own tokenbound account that hold assets, though it may not be deployed until the user wants to withraw any of the assets. Due to the couterfactual deterministic addresses, asssets can be sent to these addresses prior to deployment, and the user can be confident that only the only of the Stack NFT will ever be able to access them.

*Note:* contracts for ETH Stacks can be found in a separate repo at https://github.com/maceip/eth-stacks-contracts

While the potential is limitless, example included in this submission include:
- transferring assets between Stacks
- supplying assets to both Compound and Aave to earn yield (ie. "Savings Stacks")
- borrowing assets from Aave (ie. "Loan Stacks")
- using a Stack to send your spam assets
- creating a Stack for high value assets and then sending the Stack to your cold wallet
- adding a joint account holder who has equal access to the Stack's assets
- adding a trusted social recovery address that can access the asset if you lose your private key
- creating a Stack as a stealth address that you want to receive payment, without immediately being linked your main address
- creating Stacks to act as NFT galleries
- recycle your private keys periodically by sending your master Stack to a new wallet address -- only 1 transaction required!

Contracts were deployed using Hardhat via Scaffold.eth, interfacing with already-deployed registry and account implementation contracts for ERC-6551 tokenbound accounts.

The front-end is powered by React, Wagmi, Tailwind, Prisma, Sign-in with Ethereum, ConnectKit and Viem.

User assets are pulled using Airstack endpoints.

Unit tests were written using hardhat and ethers.js.

All of the above was powered by caffeine.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## How it was made

## Tech Stack
**Are you using any Ethereum developer tools for your project?**
Wagmi, Viem, ConnectKit, Sign In With Ethereum

**Which blockchain networks will your project interact with?**
Polygon, Goerli

**Which programming languages are you using in your project?**
Typescript and Solidity

**Are you using any web frameworks for your project?**
Next.js

**Are you using any databases for your project?**
Railway

**Are you using any design tools for your project?**
Figma

**Are there any other specific technologies, libraries, frameworks, or tools you're making heavy usage of don't fit into the categories above?**


## Prize Selection 

* [TokenBound](https://ethglobal.com/events/waterloo2023/prizes#tokenbound-and-erc-6551)
* [Polygon](https://ethglobal.com/events/waterloo2023/prizes#polygon) 
* [IPFS](https://ethglobal.com/events/waterloo2023/prizes#ipfs-filecoin-and-more)
* [Compound](https://ethglobal.com/events/waterloo2023/prizes#compound-grants-program)
* [Airstack](https://ethglobal.com/events/waterloo2023/prizes#airstack)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

Contributors:
* [Roy Sandoval, Product Designer](https://twitter.com/roysandoval_)
* [Ryan MacArthur, Smart Contract Developer](https://twitter.com/maceip)
* [Mark Carey, Full Stack Developer](https://twitter.com/mthacks)
* [Taylan McRae-Yu, Product Manager](https://twitter.com/0xTAY_)

Credits: 
* [TokenBound ERC-6551](https://tokenbound.org)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
