'use server';

import {
  continueConversation as continueConversationFlow,
  ContinueConversationOutput,
} from '@/ai/flows/continue-conversation';

import {
  classifyRequirements as classifyRequirementsFlow,
  ClassifyRequirementsOutput,
} from '@/ai/flows/classify-requirements';
import {
  generateUserStories as generateUserStoriesFlow,
  GenerateUserStoriesOutput,
} from '@/ai/flows/generate-user-stories';
import {
  identifyStakeholders as identifyStakeholdersFlow,
  IdentifyStakeholdersOutput,
} from '@/ai/flows/identify-stakeholders';
import {
  speakRequirements as speakRequirementsFlow,
  SpeakRequirementsOutput,
} from '@/ai/flows/speak-requirements';
import type {
  Requirement,
  Message,
  UserStory,
  Stakeholder,
} from '@/lib/types';


export async function continueConversation(
  conversationHistory: Message[]
): Promise<ContinueConversationOutput> {
  const result = await continueConversationFlow({ conversationHistory });
  return result;
}

export async function generateReport(
  requirements: Requirement[],
): Promise<{
  classifiedResult: ClassifyRequirementsOutput['classifiedRequirements'];
  userStories: UserStory[];
  stakeholders: Stakeholder[];
}> {
  const requirementDescriptions = requirements.map(r => r.description);

  // 1. Classify Requirements
  const { classifiedRequirements: classifiedResult } =
    await classifyRequirementsFlow({ requirements: requirementDescriptions });
  
  return { classifiedResult, userStories: [], stakeholders: [] };
}
