import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Icon = ({ name, tooltip, onClick }) => {
  tooltip = tooltip ?? '';
  const tooltipId = tooltip.replace(/[^A-z]*/gm, '');

  return (
    <>
      <a
        className="icon"
        href="#"
        onClick={onClick}
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltip}
      >
        <img src={`/${name}.svg`} />
      </a>
      {tooltip && (
        <Tooltip id={tooltipId} style={{ fontSize: '14px', padding: '4px' }} />
      )}
    </>
  );
};

export default Icon;
