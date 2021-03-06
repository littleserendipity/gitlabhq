# frozen_string_literal: true

module RuboCop
  module Cop
    # Cop that blacklists the use of `reload`.
    class ActiveRecordAssociationReload < RuboCop::Cop::Cop
      MSG = 'Use reset instead of reload. ' \
        'For more details check the https://gitlab.com/gitlab-org/gitlab-ce/issues/60218.'

      def_node_matcher :reload?, <<~PATTERN
        (send _ :reload ...)
      PATTERN

      def on_send(node)
        return unless reload?(node)

        add_offense(node, location: :selector)
      end
    end
  end
end
