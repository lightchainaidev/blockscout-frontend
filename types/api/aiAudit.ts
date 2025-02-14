export type AIAudit = {
  _id: string;
  contractAddress: string;
  createdAt: string;
  findings: {
    issues: Array<string>;
    fixes: Array<string>;
    bestPractices: Array<string>;
  };
  status: string;
  updatedAt: string;
  riskLevel: string;
  securityScore: number;
};
