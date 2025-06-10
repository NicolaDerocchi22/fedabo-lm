import React from 'react';
import ResponseBox from './ResponseBox';

const placeholderText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus sapien non volutpat lobortis. Nullam et iaculis erat. Integer gravida ullamcorper viverra. Nullam pulvinar lectus pretium, rhoncus leo vitae, aliquet dolor. Pellentesque pretium lectus semper ipsum feugiat sagittis. Aenean sit amet leo nisl. Duis ac euismod tortor. Nam sit amet laoreet risus.Pellentesque porttitor dui eget est pretium, sed condimentum quam auctor. Pellentesque lobortis enim sed porttitor ultrices. In lobortis viverra iaculis. Proin nisl tellus, tempor in dignissim a, congue quis neque. Pellentesque eget magna leo. Nulla id dolor laoreet, convallis dui quis, feugiat leo. Etiam ultricies justo id velit lobortis, vel ultrices tellus finibus. Duis nec semper massa, id porta lorem. Praesent volutpat ac risus eget ullamcorper. Integer varius, augue non faucibus venenatis, lorem risus consequat mauris, vel congue sem sapien non justo. Ut et commodo lorem. Morbi vel nisl et metus porttitor tempus. Suspendisse potenti. Etiam molestie mi mauris, in lobortis risus euismod quis. Quisque suscipit ullamcorper fermentum. Pellentesque finibus nisi orci, quis gravida magna ullamcorper laoreet.Aenean pulvinar mollis dignissim. Nullam sit amet posuere purus, in fringilla magna. Etiam faucibus vitae felis ac dapibus. Quisque posuere auctor mi. Nullam a malesuada neque. Pellentesque non mi sed quam fringilla molestie a et sem. Maecenas sit amet metus suscipit, elementum leo sed, venenatis risus. Vestibulum sodales augue eget auctor suscipit. Quisque euismod felis at efficitur faucibus. Suspendisse consectetur ante dui, sed viverra nibh elementum a. Vivamus ut purus id libero eleifend molestie sollicitudin ac elit. Ut risus ex, pharetra et egestas at, tincidunt ac est. Phasellus vel ultrices augue.Donec id sodales ipsum. Suspendisse neque risus, pulvinar blandit vehicula eu, porta et sem. Aenean vitae purus eu odio viverra euismod. Vestibulum at condimentum erat. Aliquam erat volutpat. Phasellus lacinia congue erat in ultricies. Pellentesque dignissim suscipit leo et porta. Nunc sed pretium nibh, vel luctus ex. In ac gravida tellus. Vivamus eleifend, mi sed vestibulum imperdiet, magna magna rhoncus sem, ut suscipit ante felis sed mauris. Mauris mi orci, ultricies vitae ex hendrerit, tempus dignissim dolor. Nam eleifend est vel nulla consequat, vel ullamcorper dui sagittis. Nulla et augue in mauris sagittis suscipit at eget est. Maecenas convallis feugiat risus id pellentesque. Sed eu bibendum velit, sit amet euismod dui. Sed rhoncus odio nec leo iaculis, sodales consequat lectus suscipit.Nulla nec lectus in metus congue scelerisque. Mauris eget dolor ultrices, euismod leo sit amet, varius erat. Curabitur porttitor condimentum sapien, vel suscipit lacus euismod et. Sed sit amet urna elementum libero efficitur vestibulum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse tortor libero, sagittis in quam id, ullamcorper dictum ligula. Curabitur eget gravida leo, id eleifend augue. Suspendisse purus urna, dapibus ultricies rhoncus nec, blandit laoreet tellus. Praesent aliquam turpis diam, eu pellentesque diam facilisis at. Duis consectetur eu orci quis viverra. Pellentesque ultricies felis et consectetur fringilla.';

const StreamResponse: React.FC<{ showPartialResponses: boolean }> = ({
  showPartialResponses,
}) => {
  return (
    <>
      {showPartialResponses && (
        <div className='grid grid-cols-3 gap-4'>
          <ResponseBox text={placeholderText} title='Prima risposta parziale' />
          <ResponseBox
            text={placeholderText}
            title='Seconda risposta parziale'
          />
          <ResponseBox text={placeholderText} title='Terza risposta parziale' />
        </div>
      )}
      <div>
        <ResponseBox text={''} title='Risposta finale' />
      </div>
    </>
  );
};

export default StreamResponse;
