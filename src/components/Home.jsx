import WalletBalance from './WalletBalance';
import {useEffect, useState} from 'react';

import {ethers} from 'ethers';
import VineToken from '../../artifacts/contracts/vineToken.sol/VineToken.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, VineToken.abi, signer);

let totalMinted = 0
let tokens = [0,1,2,3]


function Home() {

    const [totalMinted, setTotalMinted] = useState(0);
    useEffect(() => {
        getCount();
    }, []);

    const getCount = async () => {
        const connection = contract.connect(signer);
        const count = await connection.count();
        setTotalMinted(parseInt(count));
    };

    return (
        <div>
            <WalletBalance />

            <h1>Vinery NFT Collection</h1>
            <div className="container">
                <div className="row">
                    {Array(totalMinted + 1)
                        .fill(0)
                        .map((_, i) => (
                            <div key={i} className="col-sm">
                                <NFTImage tokenId={i} getCount={getCount} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

function NFTImage({ tokenId, getCount }) {
    // const contentId = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    // const metadataURI = `${contentId}/${tokenId}.json`;
    // const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
    const imageURI = `img/${tokenId}.png`;

    const [isMinted, setIsMinted] = useState(false);
    useEffect(() => {
        getMintedStatus();
    }, [isMinted]);

    const getMintedStatus = async () => {
        // const result = await contract.isContentOwned(metadataURI);
        // console.log(result)
        // setIsMinted(result);
    };

    const mintToken = async () => {
        const connection = contract.connect(signer);
        const addr = connection.address;
        const result = await contract.mint({
            value: ethers.utils.parseEther('0.5'),
        });

        await result.wait();

        // getMintedStatus();
        getCount();
    };

    async function getURI() {
        // const uri = await contract.tokenURI(tokenId);
        // alert(uri);
    }
    return (
        <div className="card" style={{ width: '18rem' }}>
            {/*<img className="card-img-top" src={isMinted ? imageURI : 'img/placeholder.png'}></img>*/}
            <div className="card-body">
                <h5 className="card-title">ID #{tokenId}</h5>
                {!isMinted ? (
                    <button className="btn btn-primary" onClick={mintToken}>
                        Mint
                    </button>
                ) : (
                    <button className="btn btn-secondary" onClick={getURI}>
                        Taken! Show URI
                    </button>
                )}
            </div>
        </div>
    );
}

export default Home;

