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
const maxSupply = 3;

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
                    {Array(totalMinted +1)
                        .fill(0)
                        .slice(0, maxSupply)
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
        // getMintedStatus();
    }, [isMinted]);

    const mintToken = async () => {
        const connection = contract.connect(signer);
        const addr = connection.address;
        const result = await contract.mint({
            value: ethers.utils.parseEther('0.5'),
        });

        const response = await result.wait();
        // console.log(response)
        // getMintedStatus(tokenId);
        getCount();
        setIsMinted(tokenId);

    };

    async function getID() {
        alert("Token #" + tokenId + " was taken! Vine was bought!")
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
                    <button className="btn btn-secondary" onClick={getID}>
                        Taken!
                    </button>
                )}
            </div>
        </div>
    );
}

export default Home;

