/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/koopa.json`.
 */
export type Koopa = {
  address: "33NAzyKNuayyqKNW6QMXbNT69CikAhCUhPbgwZn1LR3o";
  metadata: {
    name: "koopa";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "claimRefund";
      discriminator: [15, 16, 30, 161, 255, 228, 97, 60];
      accounts: [
        {
          name: "ajoGroup";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 106, 111, 45, 103, 114, 111, 117, 112];
              },
              {
                kind: "account";
                path: "ajo_group.name";
                account: "ajoGroup";
              },
            ];
          };
        },
        {
          name: "groupTokenVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [103, 114, 111, 117, 112, 45, 118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "ajoGroup";
              },
            ];
          };
        },
        {
          name: "participant";
          writable: true;
          signer: true;
        },
        {
          name: "participantTokenAccount";
          writable: true;
        },
        {
          name: "tokenMint";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
      ];
      args: [];
    },
    {
      name: "closeAjoGroup";
      discriminator: [71, 157, 241, 188, 147, 228, 114, 235];
      accounts: [
        {
          name: "ajoGroup";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 106, 111, 45, 103, 114, 111, 117, 112];
              },
              {
                kind: "account";
                path: "ajo_group.name";
                account: "ajoGroup";
              },
            ];
          };
        },
        {
          name: "participant";
          signer: true;
        },
        {
          name: "globalState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [103, 108, 111, 98, 97, 108, 45, 115, 116, 97, 116, 101];
              },
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "contribute";
      discriminator: [82, 33, 68, 131, 32, 0, 205, 95];
      accounts: [
        {
          name: "ajoGroup";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 106, 111, 45, 103, 114, 111, 117, 112];
              },
              {
                kind: "account";
                path: "ajo_group.name";
                account: "ajoGroup";
              },
            ];
          };
        },
        {
          name: "contributor";
          signer: true;
        },
        {
          name: "contributorTokenAccount";
          writable: true;
        },
        {
          name: "groupTokenVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [103, 114, 111, 117, 112, 45, 118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "ajoGroup";
              },
            ];
          };
        },
        {
          name: "tokenMint";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "createAjoGroup";
      discriminator: [246, 150, 153, 174, 32, 199, 185, 25];
      accounts: [
        {
          name: "ajoGroup";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 106, 111, 45, 103, 114, 111, 117, 112];
              },
              {
                kind: "arg";
                path: "name";
              },
            ];
          };
        },
        {
          name: "creator";
          writable: true;
          signer: true;
        },
        {
          name: "globalState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [103, 108, 111, 98, 97, 108, 45, 115, 116, 97, 116, 101];
              },
            ];
          };
        },
        {
          name: "tokenMint";
        },
        {
          name: "creatorTokenAccount";
          writable: true;
        },
        {
          name: "groupTokenVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [103, 114, 111, 117, 112, 45, 118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "ajoGroup";
              },
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "securityDeposit";
          type: "u64";
        },
        {
          name: "contributionAmount";
          type: "u64";
        },
        {
          name: "contributionInterval";
          type: "u8";
        },
        {
          name: "payoutInterval";
          type: "u8";
        },
        {
          name: "numParticipants";
          type: "u8";
        },
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "globalState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [103, 108, 111, 98, 97, 108, 45, 115, 116, 97, 116, 101];
              },
            ];
          };
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "joinAjoGroup";
      discriminator: [13, 201, 36, 164, 38, 54, 221, 143];
      accounts: [
        {
          name: "ajoGroup";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 106, 111, 45, 103, 114, 111, 117, 112];
              },
              {
                kind: "account";
                path: "ajo_group.name";
                account: "ajoGroup";
              },
            ];
          };
        },
        {
          name: "participant";
          signer: true;
        },
        {
          name: "globalState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [103, 108, 111, 98, 97, 108, 45, 115, 116, 97, 116, 101];
              },
            ];
          };
        },
        {
          name: "tokenMint";
        },
        {
          name: "participantTokenAccount";
          writable: true;
        },
        {
          name: "groupTokenVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [103, 114, 111, 117, 112, 45, 118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "ajoGroup";
              },
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "payout";
      discriminator: [149, 140, 194, 236, 174, 189, 6, 239];
      accounts: [
        {
          name: "ajoGroup";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 106, 111, 45, 103, 114, 111, 117, 112];
              },
              {
                kind: "account";
                path: "ajo_group.name";
                account: "ajoGroup";
              },
            ];
          };
        },
        {
          name: "groupTokenVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [103, 114, 111, 117, 112, 45, 118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "ajoGroup";
              },
            ];
          };
        },
        {
          name: "recipient";
          docs: [
            "The recipient who will receive tokens (does NOT have to sign)",
          ];
          writable: true;
        },
        {
          name: "caller";
          signer: true;
        },
        {
          name: "tokenMint";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
      ];
      args: [];
    },
  ];
  accounts: [
    {
      name: "ajoGroup";
      discriminator: [205, 236, 137, 105, 137, 38, 51, 219];
    },
    {
      name: "globalState";
      discriminator: [163, 46, 74, 168, 216, 123, 133, 98];
    },
  ];
  events: [
    {
      name: "ajoGroupClosedEvent";
      discriminator: [74, 105, 44, 67, 63, 184, 139, 220];
    },
    {
      name: "ajoGroupCreatedEvent";
      discriminator: [21, 73, 101, 39, 158, 18, 39, 10];
    },
    {
      name: "ajoGroupStartedEvent";
      discriminator: [162, 217, 172, 235, 138, 116, 234, 226];
    },
    {
      name: "contributionMadeEvent";
      discriminator: [3, 118, 240, 79, 205, 32, 105, 96];
    },
    {
      name: "participantJoinedEvent";
      discriminator: [23, 196, 6, 94, 41, 112, 23, 180];
    },
    {
      name: "payoutMadeEvent";
      discriminator: [214, 222, 231, 167, 208, 36, 205, 93];
    },
    {
      name: "refundClaimedEvent";
      discriminator: [77, 83, 172, 123, 235, 58, 154, 233];
    },
  ];
  errors: [
    {
      code: 6000;
      name: "alreadyClaimed";
      msg: "You have already claimed your payout";
    },
    {
      code: 6001;
      name: "notAllContributed";
      msg: "Not all participants have contributed yet";
    },
    {
      code: 6002;
      name: "invalidContributionAmount";
      msg: "Contribution amount must be greater than zero";
    },
    {
      code: 6003;
      name: "invalidInterval";
      msg: "Interval must be between 1 and 90 days";
    },
    {
      code: 6004;
      name: "invalidParticipantCount";
      msg: "Number of participants must be between 3 and 20";
    },
    {
      code: 6005;
      name: "nameTooLong";
      msg: "Group name is too long (maximum 50 characters)";
    },
    {
      code: 6006;
      name: "groupAlreadyStarted";
      msg: "Group has already started";
    },
    {
      code: 6007;
      name: "groupAlreadyClosed";
      msg: "Group is already closed";
    },
    {
      code: 6008;
      name: "alreadyJoined";
      msg: "You have already joined this group";
    },
    {
      code: 6009;
      name: "invalidSecurityDeposit";
      msg: "Security Deposit must be greater than 0";
    },
    {
      code: 6010;
      name: "onlyAdminCanUpdate";
      msg: "Only admin can update global state";
    },
    {
      code: 6011;
      name: "alreadyVotedToClose";
      msg: "You have already voted to close this group";
    },
    {
      code: 6012;
      name: "notParticipant";
      msg: "You are not a participant in this group";
    },
    {
      code: 6013;
      name: "groupNotStarted";
      msg: "Group has not started yet";
    },
    {
      code: 6014;
      name: "groupNotClosed";
      msg: "Group has not been closed yet";
    },
    {
      code: 6015;
      name: "groupCompleted";
      msg: "Group has completed all rounds";
    },
    {
      code: 6016;
      name: "notAParticipant";
      msg: "You are not a participant in this group";
    },
    {
      code: 6017;
      name: "cannotContributeToThisRound";
      msg: "You cannot contribute to this round";
    },
    {
      code: 6018;
      name: "intervalNotPassed";
      msg: "Interval has not passed yet";
    },
    {
      code: 6019;
      name: "insufficientFunds";
      msg: "Insufficient funds in token account";
    },
    {
      code: 6020;
      name: "invalidFeePercentage";
      msg: "Fee percentage must be between 0 and 100";
    },
    {
      code: 6021;
      name: "alreadyContributed";
      msg: "You have already contributed to this round";
    },
    {
      code: 6022;
      name: "notCurrentRecipient";
      msg: "You are not the recipient for this round";
    },
    {
      code: 6023;
      name: "payoutNotYetDue";
      msg: "Payout period has not yet arrived";
    },
    {
      code: 6024;
      name: "invalidTokenAccountMint";
      msg: "Token Account mint does not match";
    },
    {
      code: 6025;
      name: "noRefundToClaim";
      msg: "No refunds is available for you to claim on this group";
    },
  ];
  types: [
    {
      name: "ajoGroup";
      type: {
        kind: "struct";
        fields: [
          {
            name: "name";
            type: "string";
          },
          {
            name: "securityDeposit";
            type: "u64";
          },
          {
            name: "contributionAmount";
            type: "u64";
          },
          {
            name: "contributionInterval";
            type: "u8";
          },
          {
            name: "payoutInterval";
            type: "u8";
          },
          {
            name: "numParticipants";
            type: "u8";
          },
          {
            name: "participants";
            type: {
              vec: {
                defined: {
                  name: "ajoParticipant";
                };
              };
            };
          },
          {
            name: "startTimestamp";
            type: {
              option: "i64";
            };
          },
          {
            name: "payoutRound";
            type: "u16";
          },
          {
            name: "closeVotes";
            type: {
              vec: "pubkey";
            };
          },
          {
            name: "isClosed";
            type: "bool";
          },
          {
            name: "vaultBump";
            type: "u8";
          },
          {
            name: "bumps";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "ajoGroupClosedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "groupName";
            type: "string";
          },
          {
            name: "totalVotes";
            type: "u8";
          },
          {
            name: "groupSize";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "ajoGroupCreatedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "groupName";
            type: "string";
          },
          {
            name: "securityDeposit";
            type: "u64";
          },
          {
            name: "contributionAmount";
            type: "u64";
          },
          {
            name: "numParticipants";
            type: "u8";
          },
          {
            name: "contributionInterval";
            type: "u8";
          },
          {
            name: "payoutInterval";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "ajoGroupStartedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "groupName";
            type: "string";
          },
          {
            name: "startTimestamp";
            type: "i64";
          },
        ];
      };
    },
    {
      name: "ajoParticipant";
      type: {
        kind: "struct";
        fields: [
          {
            name: "pubkey";
            type: "pubkey";
          },
          {
            name: "contributionRound";
            type: "u16";
          },
          {
            name: "refundAmount";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "contributionMadeEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "groupName";
            type: "string";
          },
          {
            name: "contributor";
            type: "pubkey";
          },
          {
            name: "contributionAmount";
            type: "u64";
          },
          {
            name: "currentRound";
            type: "u16";
          },
        ];
      };
    },
    {
      name: "globalState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "totalGroups";
            type: "u64";
          },
          {
            name: "activeGroups";
            type: "u64";
          },
          {
            name: "bumps";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "participantJoinedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "groupName";
            type: "string";
          },
          {
            name: "participant";
            type: "pubkey";
          },
          {
            name: "joinTimestamp";
            type: "i64";
          },
        ];
      };
    },
    {
      name: "payoutMadeEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "groupName";
            type: "string";
          },
          {
            name: "recipient";
            type: "pubkey";
          },
          {
            name: "payoutAmount";
            type: "u64";
          },
          {
            name: "payoutRound";
            type: "u16";
          },
        ];
      };
    },
    {
      name: "refundClaimedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "groupName";
            type: "string";
          },
          {
            name: "participant";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          },
        ];
      };
    },
  ];
};
