
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { RemoveScroll } from 'react-remove-scroll';
import { RoadmapType } from '../../lib/roadmap';
import RoadmapGroup from '../../pages/[roadmap]/[group]';
import { CheckIcon, CloseIcon, RepeatIcon } from '@chakra-ui/icons';
import { queryGroupElementsById } from '../../lib/renderer/utils';

type ContentDrawerProps = {
  roadmap: RoadmapType;
  groupId: string;
  onClose?: () => void;
};

export function ContentDrawer(props: ContentDrawerProps) {
  const { roadmap, groupId, onClose = () => null } = props;
  if (!groupId) {
    return null;
  }

  const isDone = localStorage.getItem(groupId) === 'done';
  const isBeginner = localStorage.getItem(groupId) === 'beginner';
  const isIntermediate = localStorage.getItem(groupId) === 'intermediate';
  const isAdvanced = localStorage.getItem(groupId) === 'advanced';

  
  //mayer
  function addClass(cls:string){
      let curGroupId=localStorage.getItem(groupId);
      if(curGroupId!=''){
        localStorage.removeItem(groupId);
        queryGroupElementsById(groupId).forEach((item) =>
          item?.classList?.remove(curGroupId)
        );
      }
      localStorage.setItem(groupId, cls);
      queryGroupElementsById(groupId).forEach((item) =>
        item?.classList?.add(cls)
      );
  }
  //mayer
  function removeClass(cls:string){
    localStorage.removeItem(groupId);
    queryGroupElementsById(groupId).forEach((item) =>
      item?.classList?.remove(cls)
    );
  }

  return (
    <Box zIndex={99999} pos="relative">
      <Box
        onClick={onClose}
        pos="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="black"
        opacity={0.4}
      />
      <RemoveScroll allowPinchZoom>
        <Box
          p="0px 30px 30px"
          position="fixed"
          w={['100%', '60%', '60%']}
          bg="white"
          top={0}
          right={0}
          bottom={0}
          borderLeftWidth={'1px'}
          overflowY="scroll"
        >
          <Flex
            mt="20px"
            justifyContent="space-between"
            alignItems="center"
            zIndex={1}
          >
            {/*mayer repeatable btn */}
            {!isDone && (
              <Button
                onClick={() => {
                  addClass('done');
                  onClose();
                }}
                colorScheme="green"
                leftIcon={<CheckIcon />}
                size="xs"
                iconSpacing={0}
              >
                <Text
                  as="span"
                  d={['block', 'none', 'none', 'block']}
                  ml="10px"
                >
                  Mark as Done
                </Text>
              </Button>
            )}
            {isDone && (
              <Button
                onClick={() => {
                 removeClass('done');
                  onClose();
                }}
                colorScheme="red"
                leftIcon={<RepeatIcon />}
                size="xs"
                iconSpacing={0}
              >
                <Text
                  as="span"
                  d={['block', 'none', 'none', 'block']}
                  ml="10px"
                >
                  Mark as Pending
                </Text>
              </Button>
            )}
           
            {/* beginner */}
            <Button
                onClick={() => {
                  if(isBeginner)removeClass('beginner');
                  else              addClass('beginner');
                  onClose();
                }}
                colorScheme={isBeginner? 'red':'green'}
                ml="5px"
                leftIcon={isBeginner? < RepeatIcon/>:<CheckIcon />}
                iconSpacing={0}
                size="xs"
            >
              <Text as="span" d={['none', 'none', 'none', 'block']} ml="10px">
                {isBeginner? 'Beginner':'mark as beginner'}
              </Text>
            </Button>
            {/* intermediate */}
            <Button
                onClick={() => {
                  if(isIntermediate)removeClass('intermediate');
                  else              addClass('intermediate');
                  onClose();
                }}
                colorScheme={isIntermediate? 'red':'green'}
                ml="5px"
                leftIcon={isIntermediate? < RepeatIcon/>:<CheckIcon />}
                iconSpacing={0}
                size="xs"
            >
              <Text as="span" d={['none', 'none', 'none', 'block']} ml="10px">
                {isIntermediate? 'Intermediate':'mark as intermediate'}
              </Text>
            </Button>
            {/* advanced */}
            <Button
                onClick={() => {
                  if(isAdvanced)removeClass('advanced');
                  else              addClass('advanced');
                  onClose();
                }}
                colorScheme={isAdvanced? 'red':'green'}
                ml="5px"
                leftIcon={isAdvanced? < RepeatIcon/>:<CheckIcon />}
                iconSpacing={0}
                size="xs"
            >
              <Text as="span" d={['none', 'none', 'none', 'block']} ml="10px">
                {isAdvanced? 'Advanced':'mark as advanced'}
              </Text>
            </Button>

            <Button
              onClick={onClose}
              colorScheme="yellow"
              ml="5px"
              leftIcon={<CloseIcon width="8px" />}
              iconSpacing={0}
              size="xs"
            >
              <Text as="span" d={['none', 'none', 'none', 'block']} ml="10px">
                Close
              </Text>
            </Button>

          </Flex>
          <RoadmapGroup isOutlet roadmap={roadmap} group={groupId} />
        </Box>
      </RemoveScroll>
    </Box>
  );
}
