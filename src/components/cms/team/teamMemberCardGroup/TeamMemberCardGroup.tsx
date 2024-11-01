import React from 'react';
import clsx from 'clsx';
import { Enum_Componentteamteammembercardgroup_Type } from '@lib/services/strapi/graphql/__generated__/graphql';
import { Maybe } from '@lib/utils/types';
import { TeamMemberCard } from '@components/cms/team/teamMemberCard';
import { getFromEnum } from '@lib/utils/object';

const textColorMap: Record<Enum_Componentteamteammembercardgroup_Type, string> = {
  Simple: 'text-black',
  Featured: 'text-white'
};

const backgroundMap: Record<Enum_Componentteamteammembercardgroup_Type, string> = {
  Simple: '',
  Featured: 'bg-primary'
};

interface Props {
  className?: string
  title?: string
  type?: Enum_Componentteamteammembercardgroup_Type
  members?: Maybe<{
    avatar?: Maybe<{
      data: Maybe<{
        attributes: Maybe<{
          url: string
          alternativeText?: Maybe<string>
          width?: Maybe<number>
          height?: Maybe<number>
        }>
      }>
    }>
    name?: string
    email?: string
    occupation?: Maybe<string>
    affiliations?: Maybe<string>
    location?: Maybe<string>
    website?: Maybe<string>
    shortCv?: Maybe<string>
  }>[]
}

export const TeamMemberCardGroup: React.FC<Props> = ({ className, title, type, members }) => {
  const textColorClassName = getFromEnum(textColorMap, type, Enum_Componentteamteammembercardgroup_Type.Simple);
  const backgroundClassName = getFromEnum(backgroundMap, type, Enum_Componentteamteammembercardgroup_Type.Simple);

  return (
    <section className={clsx('relative', className)}>
      <h3 className={clsx('text-center py-3 mb-3', textColorClassName)}>
        {title}
      </h3>

      <div className="d-flex flex-row flex-wrap justify-content-center gap-5">
        {
          members?.map((member, idx) => member && (
            <TeamMemberCard key={idx} {...member} featured={type === 'Featured'} />
          ))
        }
      </div>

      <div className={clsx('rounded-2 w-100 h-75 absolute top-0 left-0 z-n1', backgroundClassName)} />
    </section>
  );
};
