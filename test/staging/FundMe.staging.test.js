const { assert, expect } = require("chai");
const { providers } = require("ethers");
const { network, ethers, getNamedAccounts } = require("hardhat");
const {
    isCallTrace
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
const { developmentChains } = require("../../helper-hardhat-config");

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", function() {
          let fundMe;
          let deployer;
          const sendValue = ethers.utils.parseEther("1");
          beforeEach(async function() {
              deployer = (await getNamedAccounts()).deployer;
              fundMe = await ethers.getContract("FundMe", deployer);
          });

          it("Allows people to fund and withdraw", async () => {
              await fundMe.fund({ value: sendValue });
              await fundMe.withdraw();
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              );
              assert.equal(endingBalance.toString(), "0");
          });
      });
